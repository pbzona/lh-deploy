import { faker } from '@faker-js/faker'

export default function FlagNameGenerator() {
    return (
        <span style={{fontWeight: 'bold', backgroundColor: '#eee', padding: '3px'}}>Release: {faker.science.chemicalElement().name} {faker.commerce.department()} Feature</span>
    )
}