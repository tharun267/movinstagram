import React from 'react'
import { Image } from 'react-native'
import { Layout } from '@ui-kitten/components';


const SplashScreen = () => {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/popcorn.png')} style={{ height: 100, width: 100 }} />
        </Layout>
    )
}

export default SplashScreen
