import './Card.scss'

const Card = ({children}:any) => {
    return(
        <article className='card-container'>
            {children}
        </article>
    )
}

export default Card;