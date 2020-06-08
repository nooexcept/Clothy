import React from 'react'
import PublicLayout from '../components/PublicLayout'
import ShowcaseList from '../components/ShowcaseList'
import Showcase from '../components/Showcase'

const Index: React.FC = () => (
    <PublicLayout>
        <ShowcaseList
            showcases={[
                <Showcase
                    key={0}
                    img="/covered-stylish-woman-in-sunglasses-looking-away-3819572.jpg"
                />,
                <Showcase
                    key={1}
                    img="/photo-of-woman-wearing-white-shirt-3376116.jpg"
                />,
                <Showcase key={2} img="/woman-wearing-a-hat-3482614.jpg" />,
            ]}
        />
    </PublicLayout>
)

export default Index
