import React from 'react'
import { ReactWrapper } from 'enzyme'
import { createMount } from '@material-ui/core/test-utils'
import Paper from '@material-ui/core/Paper'
import ProductPreview from '../../../components/ProductPreview'

interface ProductPreviewTestProps {
    name: string
    desc: string
    url: string
    img: string
}

function createTestProps(): ProductPreviewTestProps {
    return {
        name: 'Some product',
        desc: 'Some description',
        url: 'some-url',
        img: 'some-image.jpeg',
    }
}

let props: ProductPreviewTestProps
let wrapper: ReactWrapper
let mount

beforeEach(() => {
    props = createTestProps()
    mount = createMount()
    wrapper = mount(<ProductPreview {...props} />)
})

afterEach(() => {
    wrapper.unmount()
})

describe('<ProductPreview /> rendering', () => {
    it('should render without problems', () => {
        expect(wrapper).toMatchSnapshot()
    })
})

describe('<ProductPreview /> interactions', () => {
    it('should call the onClick function when <Paper /> is clicked', () => {
        delete window.location
        ;(window.location as Partial<Location>) = {}
        const paper = wrapper.find(Paper)
        expect(paper.length).toEqual(1)
        paper.simulate('click')
        expect(window.location.href).toEqual(`/products/${props.url}`)
    })
})
