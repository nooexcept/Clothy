import React from 'react'
import { createMount } from '@material-ui/core/test-utils'
import TrendingList from '../../../components/TrendingList'
import ProductPreview from '../../../components/ProductPreview'

const mockedList = [
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

let mount: ReturnType<typeof createMount>

beforeEach(() => {
    mount = createMount()
})

describe('<TrendingList /> rendering', () => {
    it('should render without problems', () => {
        const wrapper = mount(<TrendingList list={mockedList} error={false} />)
        expect(wrapper).toMatchSnapshot()
        wrapper.unmount()
    })

    it('should show a error message if there is an error', () => {
        const wrapper = mount(<TrendingList list={undefined} error={true} />)
        expect(wrapper.find(TrendingList).text()).toEqual(
            'An error occurred while getting trending products, try again later.'
        )
        wrapper.unmount()
    })

    it('should show a loading message if there is no error but the list is falsy', () => {
        const wrapper = mount(<TrendingList list={undefined} error={false} />)
        expect(wrapper.find(TrendingList).text()).toEqual(
            'Loading trending products...'
        )
        wrapper.unmount()
    })

    it('should show a message if the list has no products', () => {
        const wrapper = mount(<TrendingList list={[]} error={false} />)
        expect(wrapper.find(TrendingList).text()).toEqual(
            'Nothing is trending right now'
        )
        wrapper.unmount()
    })

    it('should show a <ProductPreview /> for each list item', () => {
        const wrapper = mount(<TrendingList list={mockedList} error={false} />)
        expect(wrapper.find(ProductPreview)).toHaveLength(mockedList.length)
        wrapper.unmount()
    })
})
