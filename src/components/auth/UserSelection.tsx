import React, { useState } from "react"

export enum SelectionType {
    registration, login, reset
}

export const UserSelection: React.FC = () => {
    const [selection, setSelection] = useState<SelectionType>(SelectionType.login);

    const handleSelection = (val: SelectionType) => {
        setSelection(val)
    }
    return (<></>)
}