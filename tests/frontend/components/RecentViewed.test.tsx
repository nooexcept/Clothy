import React from 'react'
import { ReactWrapper } from 'enzyme'
import { createMount } from '@material-ui/core/test-utils'
import Card from '@material-ui/core/Card'
import RecentViewed from '../../../components/RecentViewed'

let mount: ReturnType<typeof createMount>
let wrapper: ReactWrapper

const mockedProds = [
    {
        name: 'Ultra chill jumpers',
        url: 'ultra-chill-jumpers',
        description: 'If you wanna look chill, you need ultra chill jumpers',
        stock: 6,
        price: 80,
        cod: 'JUMPERS002',
        images: ['/photo-of-woman-standing-on-staircase-3120339.jpg'],
    },
    {
        name: 'Elegant handbag',
        url: 'elegant-handbag',
        description: 'This handbag is as elegant as it is heavy',
        stock: 32,
        price: 1000,
        cod: 'HANDBAG001',
        images: [
            '/woman-wearing-pink-overcoat-and-black-inner-top-2043590.jpg',
        ],
    },
]

beforeEach(() => {
    mount = createMount()
    wrapper = mount(<RecentViewed recentProducts={mockedProds} />)
})

afterEach(() => {
    wrapper.unmount()
})

describe('<RecentViewed /> rendering', () => {
    it('should render without problems', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('should render a card for each product', () => {
        expect(wrapper.find(Card).length).toEqual(mockedProds.length)
    })
})
