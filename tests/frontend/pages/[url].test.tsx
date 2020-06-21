import React from 'react'
import { ShallowWrapper } from 'enzyme'
import { createShallow } from '@material-ui/core/test-utils'
import Product, {
    getStaticPaths,
    getStaticProps,
} from '../../../pages/products/[url]'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { ParsedUrlQuery } from 'querystring'

const mockedProducts = [
    {
        name: 'Ultra chill jumpers',
        url: 'ultra-chill-jumpers',
        description: 'If you wanna look chill, you need ultra chill jumpers',
        stock: 6,
        price: 80,
        cod: 'JUMPERS002',
        images: ['/photo-of-woman-standing-on-staircase-3120339.jpg'],
    },
]

let shallow: ReturnType<typeof createShallow>
let wrapper: ShallowWrapper
const mock = new MockAdapter(axios)

beforeEach(() => {
    shallow = createShallow()
    wrapper = shallow(<Product product={mockedProducts[0]} />)
})

afterEach(() => {
    mock.reset()
})

describe('<Product /> rendering', () => {
    it('should render without problems', () => {
        expect(wrapper).toMatchSnapshot()
    })
})

describe('<Product /> data fetching', () => {
    it('should return paths from db, in getStaticPaths', async () => {
        mock.onGet(
            `http://localhost:${process.env.EXPRESS_PORT}/api/products/`
        ).reply(200, mockedProducts)

        const res = await getStaticPaths()

        expect(
            ((res.paths[0] as unknown) as ParsedUrlQuery & {
                params: { url: string }
            }).params.url
        ).toEqual(mockedProducts[0].url)
    })

    it('should return a product from db when specifying its url, in getStaticProps', async () => {
        mock.onGet(
            `http://localhost:${process.env.EXPRESS_PORT}/api/products/${mockedProducts[0].url}`
        ).reply(200, mockedProducts[0])

        const res = await getStaticProps({
            params: { url: mockedProducts[0].url },
        })
        expect(res.props.product).toEqual(mockedProducts[0])
    })
})
