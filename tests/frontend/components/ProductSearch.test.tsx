import React from 'react'
import { ReactWrapper, HTMLAttributes } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { createMount } from '@material-ui/core/test-utils'
import ProductPreview from '../../../components/ProductPreview'
import ProductSearch from '../../../components/ProductSearch'
import InputBase from '@material-ui/core/InputBase'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mockedSuggestions = [
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

const altMockedSuggestions = [
    {
        name: 'This is wrong',
        url: 'should-not-show',
        description: 'This is only displayed if some test failed',
        stock: 0,
        price: 0,
        cod: 'FAIL001',
        images: ['/failure.jpg'],
    },
]

const searchEndpoint = (txt: string) =>
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/search/${txt}/0/3`

let wrapper: ReactWrapper
let mount: ReturnType<typeof createMount>
const mock = new MockAdapter(axios)

beforeEach(() => {
    mount = createMount()
    wrapper = mount(<ProductSearch />)
})

afterEach(() => {
    mock.reset()
    wrapper.unmount()
})

describe('<ProductSearch /> rendering', () => {
    it('should render without problems', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it("shouldn't show suggestions if there is no text", () => {
        const suggestionsDiv = wrapper.find('#suggestions')
        expect(suggestionsDiv.length).toEqual(0)
    })
})

describe('<ProductSearch /> interactions', () => {
    it('should show suggestions only when appropriate', async () => {
        mock.onGet(searchEndpoint('Ultra')).reply(200, mockedSuggestions)

        await act(async () => {
            wrapper
                .find(InputBase)
                .at(0)
                .find('input')
                .simulate('change', { target: { value: 'Ultra' } })
        })

        wrapper.update()

        expect(wrapper.find('#suggestions').length).toEqual(1)

        await act(async () => {
            ;(wrapper.find('ClickAwayListener').props() as HTMLAttributes & {
                onClickAway: () => void
            }).onClickAway()
        })

        wrapper.update()

        expect(wrapper.find('#suggestions').length).toEqual(0)

        await act(async () => {
            wrapper.find(InputBase).at(0).find('input').simulate('click')
        })

        wrapper.update()

        expect(wrapper.find('#suggestions').length).toEqual(1)
    })

    it('should show the latest data requested', async () => {
        mock.onGet(searchEndpoint('This')).reply(200, mockedSuggestions)

        mock.onGet(searchEndpoint('That')).reply(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, altMockedSuggestions])
                }, 1000)
            })
        })

        const textInput = wrapper.find(InputBase).at(0).find('input')

        await act(async () => {
            textInput.simulate('change', { target: { value: 'That' } })
            textInput.simulate('change', { target: { value: 'This' } })
        })

        wrapper.update()

        const suggestionsDiv = wrapper.find('#suggestions')
        expect(suggestionsDiv.length).toEqual(1)

        const correctPreviewProps = wrapper.find(ProductPreview).props()

        expect(correctPreviewProps).toEqual({
            name: mockedSuggestions[0].name,
            desc: `${mockedSuggestions[0].description}...`,
            url: mockedSuggestions[0].url,
            img: mockedSuggestions[0].images[0],
        })
    })

    it('shouldn\'t show suggestions if there is not enough text', async () => {
        mock.onGet(searchEndpoint('')).reply(200, [])
        const textInput = wrapper.find(InputBase).at(0).find('input')

        await act(async () => {
            textInput.simulate('change', { target: { value: '' } })
        })

        wrapper.update()
        const suggestionsDiv = wrapper.find('#suggestions')
        expect(suggestionsDiv.length).toEqual(0)
    })
})
