import { ReactElement } from "react"
import { CartTop } from "./cart-top"
import { BookIcon } from "../icon/book"
import { ShareIcon } from "../icon/share"
import { DeleteIcon } from "../icon/delete"

interface CardBoxProps{
     cartTop:ReactElement,
     frame:ReactElement
}

export const CardBox=(props:CardBoxProps)=>{
    return  <div className="bg-white max-w-sm h-70 m-10 p-10 rounded-xl border">
            {props.cartTop} {props.frame}
          </div>

}