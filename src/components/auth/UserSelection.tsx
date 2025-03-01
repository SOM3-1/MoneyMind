import { SelectionType } from "@ourtypes/Auth";
import React, { useState } from "react"
import { Login } from "./Login";
import { Register } from "./Register";
import { ForgotPassword } from "./ForgotPassword";

export const UserSelection: React.FC = () => {
    const [selection, setSelection] = useState<SelectionType>(SelectionType.login);

    const handleSelection = (val: SelectionType) => {
        setSelection(val)
    }

    return (<>{selection === SelectionType.login ? <Login handleSelection={handleSelection} /> : (selection === SelectionType.registration ? <Register handleSelection={handleSelection} /> : <ForgotPassword handleSelection={handleSelection} />)}</>)
}