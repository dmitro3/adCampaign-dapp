import { useEffect, useState } from "react";
import AddressURL from "../AddressURL/AddressURL";
import Card from "../Card/Card";
import './CardTable.scss'
import { currencyConverter } from "../../common/helpers";

const CardTable = ({title, contents}:{title: string, contents: any}) => {

    const [headers, setHeaders] = useState([])
    const addressHeaders = ['profileAddress', 'transactionDigest', 'walletAddress']

    const tranformData = (arr: any) => {
        for(let i in (arr)){
            return Object.keys(arr[i]);
        }
    }

    useEffect(()=>{
        setHeaders(tranformData(contents) as any)
    },[contents])

    return(
        <Card>
            <h1 className="ff-tertiary font-size-24 font-weight-700"> {title} </h1>
            <table className="table-styles">
                <thead>
                <tr>
                    {
                        headers?.length && headers.map((header, index)=>(
                            <th  className="font-size-10 text-transform-uppercase " key={`header-${index}`}>{header}</th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {contents?.map((content: any, index: number) => (
                    <tr key={`content-${index}`}>
                        {headers?.map((header: any) => (
                            //todo - refactor this code
                            <td key={header.id} className="text-transform-capitalize">{ ( addressHeaders.includes(header) ? <AddressURL address={content[header]} />  : (((typeof(content[header]) === 'number') && content[header] > 10000  ) ? currencyConverter(content[header]) : content[header] ) ) }</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </Card>     
    )
}

export default CardTable;