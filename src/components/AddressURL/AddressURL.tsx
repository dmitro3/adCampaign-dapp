import { SUI_EXPLORER } from '../../common/config';
import { shortnerAddress } from '../../common/helpers';
import './AddressURL.scss'

const AddressURL = ({address}:{address: string}) => {
    const url = `${SUI_EXPLORER}${address}`
    
    return(
        <a href={url} className='address-url-container' target='_blank'> {shortnerAddress(address)} </a>
    )

}
export default AddressURL;