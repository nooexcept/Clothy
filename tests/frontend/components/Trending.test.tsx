import React from 'react'
import { ReactWrapper } from 'enzyme'
import { createMount } from '@material-ui/core/test-utils'
import { act } from 'react-dom/test-utils'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Trending from '../../../pages/trending'
import TrendingList from '../../../components/TrendingList'

let mount: ReturnType<typeof createMount>
let wrapper: ReactWrapper
const mock = new MockAdapter(axios)

const mockedTrend = [
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

beforeEach(async () => {
    mount = createMount()
    mock.onGet(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/trending`
    ).reply(200, mockedTrend)
    await act(async () => {
        wrapper = mount(<Trending />)
    })
    wrapper.update()
})

afterEach(() => {
    mock.reset()
    wrapper.unmount()
})

describe('<Trending /> rendering', () => {
    it('should render without problems', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('should render a <TrendingList />', () => {
        expect(wrapper.find(TrendingList)).toHaveLength(1)
    })
})
