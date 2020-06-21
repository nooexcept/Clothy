import React from 'react'
import { ShallowWrapper } from 'enzyme'
import { createShallow } from '@material-ui/core/test-utils'
import Index, { getServerSideProps } from '../../../pages/index'
import ShowcaseList from '../../../components/ShowcaseList'
import RecentViewed from '../../../components/RecentViewed'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { IncomingMessage } from 'http'

const mockedProduct = [
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

const mockedShowcased = [
    {
        name: 'Summer happiness',
        cover: 'covered-stylish-woman-in-sunglasses-looking-away-3819572.jpg',
        description: 'The summer happiness collection!',
        products: ['5edec7af4fd2c4068cc53644', '5edec8b84fd2c4068cc53645'],
    },
    {
        name: 'Brazil fashion',
        cover: 'photo-of-woman-wearing-white-shirt-3376116.jpg',
        description: 'The Brazil fashion collection!',
        products: ['5edec9354fd2c4068cc53646'],
    },
    {
        name: 'Vintage',
        cover: 'woman-wearing-a-hat-3482614.jpg',
        description: 'The vintage collection!',
        products: ['5edecad54fd2c4068cc53647'],
    },
]

let shallow: ReturnType<typeof createShallow>
let wrapper: ShallowWrapper
const mock = new MockAdapter(axios)

beforeEach(() => {
    shallow = createShallow()
    wrapper = shallow(<Index showcased={mockedShowcased} recentProducts={[]} />)
})

afterEach(() => {
    mock.reset()
})

describe('<Index /> rendering', () => {
    it('should render without problems', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('should render a <ShowcaseList /> to show featured products', () => {
        expect(wrapper.find(ShowcaseList)).toHaveLength(1)
    })

    it('shouldn\'t render a <RecentViewed /> if it didn\'t receive any recent products', () => {
        expect(wrapper.find(RecentViewed)).toHaveLength(0)
    })

    it('should render a <RecentViewed /> if it did receive recent products', () => {
        const wrapperWithRecentProds = shallow(
            <Index
                showcased={mockedShowcased}
                recentProducts={[mockedProduct[0]]}
            />
        )
        expect(wrapperWithRecentProds.find(RecentViewed)).toHaveLength(1)
    })
})

type SessionMessage = Partial<IncomingMessage> & Partial<Express.Session>

describe('<Index /> data fetching', () => {
    it('should return only showcased if there is no recent product, in getServerSideProps', async () => {
        mock.onGet(
            `http://localhost:${process.env.EXPRESS_PORT}/api/collections/showcases`
        ).reply(200, mockedShowcased)

        const mockedSession: {
            req: { session: SessionMessage }
        } = {
            req: {
                session: {},
            },
        }

        const res = await getServerSideProps(
            (mockedSession as unknown) as GetServerSidePropsContext<
                ParsedUrlQuery
            >
        )

        expect(res.props.recentProducts).toEqual(null)
        expect(res.props.showcased.length).toEqual(mockedShowcased.length)

        for (let i = 0; i < mockedShowcased.length; i += 1)
            expect(res.props.showcased[i]).toEqual(mockedShowcased[i])
    })

    it('should return showcased and recent product if provided, in getServerSideProps', async () => {
        mock.onGet(
            `http://localhost:${process.env.EXPRESS_PORT}/api/collections/showcases`
        ).reply(200, mockedShowcased)

        mock.onGet(
            `http://localhost:${process.env.EXPRESS_PORT}/api/products/${mockedProduct[0].url}`
        ).reply(200, mockedProduct)

        const mockedSession: {
            req: { session: SessionMessage }
        } = {
            req: {
                session: {
                    recentProducts: [mockedProduct[0].url],
                },
            },
        }

        const res = await getServerSideProps(
            (mockedSession as unknown) as GetServerSidePropsContext<
                ParsedUrlQuery
            >
        )

        expect(res.props.recentProducts.length).toEqual(1)
        expect(res.props.recentProducts[0]).toEqual(mockedProduct)

        expect(res.props.showcased.length).toEqual(mockedShowcased.length)

        for (let i = 0; i < mockedShowcased.length; i += 1)
            expect(res.props.showcased[i]).toEqual(mockedShowcased[i])
    })
})
