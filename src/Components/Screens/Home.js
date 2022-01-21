import React from 'react'
import {Container} from 'react-bootstrap'
import { MyProducts } from '.'
export function Home() {
    return (
        <Container>
            <h3 className="mt-5">My Products</h3>
            <MyProducts/>
        </Container>
    )
}

