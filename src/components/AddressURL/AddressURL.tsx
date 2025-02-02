import { SUI_EXPLORER } from '../../common/config';
import { shortnerAddress } from '../../common/helpers';
import './AddressURL.scss'

const AddressURL = ({address, type}:{address: string, type: string}) => {
    const url = `${SUI_EXPLORER}/${type}/${address}`
    
    return address && (
        <a href={url} className='address-url-container' target='_blank'> { shortnerAddress(address)} </a>
    )

}
export default AddressURL;