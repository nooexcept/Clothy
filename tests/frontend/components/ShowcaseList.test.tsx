import React from 'react'
import { ShallowWrapper } from 'enzyme'
import { createShallow } from '@material-ui/core/test-utils'
import ShowcaseList from '../../../components/ShowcaseList'
import Showcase from '../../../components/Showcase'

let shallow: ReturnType<typeof createShallow>
let wrapper: ShallowWrapper

const mockedProd = {
    title: 'Ultra chill jumpers',
    description: 'If you wanna look chill, you need ultra chill jumpers',
    img: '/photo-of-woman-standing-on-staircase-3120339.jpg',
}

beforeEach(() => {
    shallow = createShallow()
    wrapper = shallow(
        <ShowcaseList
            showcases={[
                <Showcase key={0} {...mockedProd} />,
                <Showcase key={1} {...mockedProd} />,
                <Showcase key={2} {...mockedProd} />,
            ]}
        />
    )
})

describe('<ShowcaseList /> rendering', () => {
    it('should render without problems', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('should render all <Showcase /> elements specified', () => {
        expect(wrapper.find(Showcase).length).toEqual(3)
    })
})
