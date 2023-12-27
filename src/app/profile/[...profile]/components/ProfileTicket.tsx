import { FC } from 'react'
import {QrCode} from './QR'
interface pageProps {
    ticketData:any
}

const App: FC<pageProps> = ({ticketData}) => {

    const dataURL = `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(ticketData))}`;
    return (
        <div className={""}>
            <QrCode value={ticketData} size={150} correctionLevel={"M"}/>
        </div>
    )
}

export default App