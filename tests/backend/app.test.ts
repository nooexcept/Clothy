import app from '../../server/app'
import * as express from 'express'
import supertest from 'supertest'
import { productsData, showcaseProdData } from '../mockUtil'

let request: supertest.SuperTest<supertest.Test>
let myApp: { app: express.Express; clear: () => void }

beforeEach(async () => {
    try {
        myApp = await app('localhost', 'localhost')
    } catch (e) {
        console.error(e)
    }

    request = supertest.agent(myApp.app)
})

afterEach(async () => {
    await myApp.clear()
})

it('should return all products in /api/products', async (done) => {
    const response = await request.get('/api/products')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(productsData)
    done()
})

it('should not return anything if trying to search with more than 50 characters', async (done) => {
    const response = await request.get(
        '/api/products/search/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/0/10'
    )
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
    done()
})

it('should search for products', async (done) => {
    const response = await request.get('/api/products/search/summer/0/10')

    expect(response.status).toBe(200)
    expect(response.body).toEqual([productsData[0]])
    done()
})

it('should return showcased collections', async (done) => {
    const response = await request.get('/api/collections/showcases')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(showcaseProdData)
    done()
})

it('should return a specific product by url in /api/products/:url', async (done) => {
    const response = await request.get(`/api/products/${productsData[0].url}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(productsData[0])
    done()
})

it('should add a product that doesnt exists in /products/:url', async (done) => {
    const mockApp = express.default()

    mockApp.use((req, res, next) => {
        ;(req.session as Partial<Express.Session>) = {
            recentProducts: [productsData[1].url],
        }
        next()
    })

    mockApp.use(myApp.app)

    mockApp.use((req, res) => {
        res.json(req.session)
    })

    const mockedRequest = supertest.agent(mockApp)

    const response = await mockedRequest.get(`/products/${productsData[0].url}`)
    expect(response.status).toBe(200)
    expect(response.body.recentProducts).toEqual([
        productsData[1].url,
        productsData[0].url,
    ])
    done()
})

it('should pop from the recent array in /products/:url if there is more than five products', async (done) => {
    const mockApp = express.default()

    mockApp.use((req, res, next) => {
        ;(req.session as Partial<Express.Session>) = {
            recentProducts: [
                productsData[0].url,
                productsData[0].url,
                productsData[0].url,
                productsData[0].url,
                productsData[1].url,
            ],
        }
        next()
    })

    mockApp.use(myApp.app)

    mockApp.use((req, res) => {
        res.json(req.session)
    })

    const mockedRequest = supertest(mockApp)

    const response = await mockedRequest.get(`/products/${productsData[2].url}`)
    expect(response.status).toBe(200)
    expect(response.body.recentProducts[4]).toEqual(productsData[2].url)
    done()
})

it('should create the session array if it doesn\'t exists in /products/:url', async (done) => {
    const responseA = await request.get(`/products/${productsData[0].url}`)
    expect(responseA.status).toBe(404)

    const response = await request.get(`/api/products/trending`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual([productsData[0]])
    done()
})
