import { Button } from "react-bootstrap"
import { cardColor, primaryColor, textColor } from "../utils/color_pallate"
import { textSize } from "../utils/font_size"

const OutlinedButton = ({redirect,text,className,onClick,borderColor}) => {
    return (
        <Button className={className??' mt-0'} onClick={onClick&&onClick} style={{color:textColor,borderRadius:"10px",borderWidth:1,backgroundColor:cardColor, fontSize:textSize,padding:"10px 30px",borderColor:borderColor??primaryColor}}>{text}</Button>

    )
}

export default OutlinedButton