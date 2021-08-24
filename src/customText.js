import React from 'react'
import { Text } from 'react-native'

export function CustomText (props) {
    return (
        <Text {...props} style={[{fontFamily: 'Manrope_500Medium'}, props.style]}>{props.children}</Text>
    )
}