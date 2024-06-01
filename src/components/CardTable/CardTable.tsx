import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import AddressURL from "../AddressURL/AddressURL";
import Card from "../Card/Card";
import { currencyConverter } from "../../common/helpers";
import './CardTable.scss'

const CardTable = ({title, contents}:{title: string, contents: any}) => {

    const [headers, setHeaders] = useState([])
    const addressHeaders = ['profileAddress', 'transactionDigest', 'walletAddress']

    const getType = (key: string) => {
        if(key === 'profileAddress'){
            return 'object'
        }else if(key === 'walletAddress'){
            return 'account'
        }else if(key === 'transactionDigest'){
            return 'txblock'
        }
        return 'object'
    }

    const tranformData = (arr: any) => {
        for(let i in (arr)){
            return Object.keys(arr[i]);
        }
    }

    const HandleTextOverflow = ({content, header}:any) => {
        const text = content[header]?.length>10 ? content[header].slice(0,9)+'...' : content[header];
        return(
            <>
                <p data-tooltip-id="my-tooltip-1">{text}</p>     
                {header == 'message' && <Tooltip
                    id="my-tooltip-1"
                    place="bottom"
                    content={content[header]}
                />}
           </>
        )
    }

    useEffect(()=>{
        const headerArr = tranformData(contents);
        headerArr?.unshift('#Rank');
        headerArr?.sort()
        setHeaders(headerArr as any)
    },[contents])

    return(
        <Card>
            <h1 className="ff-tertiary font-size-24 font-weight-700"> {title} </h1>
            <table className="table-styles">
                <thead>
                <tr>
                    {
                        headers?.length && headers.map((header, index)=>(
                            <th  className="font-size-10 text-transform-capitalize " key={`header-${index}`}>{header === 'transactionDigest' ? 'Explorer' :  header}</th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                    {contents?.map((content: any, index: number) => (
                        <>
                            <tr>
                                {headers?.map((header: any) => (
                                    //todo - refactor this code
                                    <td key={`values-${index}`} className="text-transform-capitalize">
                                        {header === '#Rank' && <p>{index+1}</p>}
                                        {( addressHeaders.includes(header) ? 
                                            <AddressURL type={getType(header)} address={content[header]} />  : 
                                                (((typeof(content[header]) === 'number') && content[header] > 10000  ) ? 
                                                    currencyConverter(content[header]) :  
                                                        <HandleTextOverflow key={`overflow-${index}`} content={content} header={header} /> ) ) }
                                    </td>
                                ))}
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </Card>     
    )
}

export default CardTable;