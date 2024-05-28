import AddressURL from "../AddressURL/AddressURL";
import Card from "../Card/Card";
import './CardTable.scss'

const CardTable = ({title, contents}:{title: string, contents: any}) => {
    return(
        <Card>
            <h1 className="ff-tertiary font-size-24 font-weight-700"> {title} </h1>
            <table className="table-styles">
                <thead>
                <tr>
                    <th></th>
                    <th className="font-size-10">Total Clicks</th>
                    <th className="font-size-10">Total Earnings</th>
                </tr>
                </thead>
                <tbody>
                    {
                        contents.map(({profileAddress, validClicks, invalidClicks, earnings}:any, index: any)=>(
                            <tr key={`table-${index}`}>
                                <td>{<AddressURL address={profileAddress} />}</td>
                                <td>{parseInt(validClicks) + parseInt(invalidClicks)}</td>
                                <td>{earnings}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Card>     
    )
}

export default CardTable;