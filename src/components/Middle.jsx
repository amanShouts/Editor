import { useEffect, useState } from "react";
import "../css/Middle.css"

import { VersionList } from "./VersionList";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ResponsiveDialog from "./AlertDialog";

export function Middle() {
    const [text, setText] = useState("")
    const [versions, setVersions] = useState([])
    const [title, setTitle] = useState("")
    const [confirmation, setConfirmation] = useState(false)
    const [confirmationAnswer, setConfirmationAnswer] = useState(false)
    const [restoreObj, setRestoreObj] = useState({})

    useEffect(() => {
        if (confirmationAnswer) {
            setText(prev => restoreObj.content)
            setTitle(prev => restoreObj.title)
            setRestoreObj(prev => { })
            setConfirmationAnswer(prev => false)
            setConfirmation(prev => false)
        }
    }, [confirmationAnswer])

    function handleChange(content) {
        // content , delta, source, editor
        setText(content)
    }

    function restoreVersion(element) {
        let restoreText = element.content
        console.log(restoreText, " inside resotre version ", text)
        setRestoreObj(prev => element)
        //check if the two versions are same or diff
        if (restoreText != text) {
            // the two versions content are different, ask user 
            console.log(" yessssssssssssssssssssssssssssss")
            setConfirmation(prev => true)
        }
    }

    function saveDocument() {
        // save the editor content thats collected in state 
        const currDate = new Date().toLocaleDateString();
        const currTime = new Date().toLocaleTimeString();
        console.log(currDate, currTime)

        let versionObj = {
            title: title,
            version: currDate + " " + currTime,
            content: text
        }

        setVersions((prev) => {
            return [...prev, versionObj]
        })
    }
    return (
        <div className="middle_wrapper">
            {/* {confirmation == true ? <ResponsiveDialog /> : <> </>} */}
            <ResponsiveDialog openDialog={confirmation} setConfirmationAnswer={setConfirmationAnswer} />
            <div className="middle_left_wrapper">
                <div className="middle_left_input_wrapper">
                    <span className="middle_left_input_texts"> Title : </span>
                    <input type="text" className="middle_left_input" onInput={(e) => setTitle(e.target.value)} value={title} />
                </div>
                <ReactQuill theme="snow" className="middle_left_editor" defaultValue="Start Typing ..." value={text} onChange={handleChange} />

                <div className="middle_left_button_wrapper">
                    <button className="middle_left_button" onClick={saveDocument}>
                        Save
                    </button>
                </div>

            </div>
            <div className="middle_right_wrapper">
                <VersionList versionList={versions} restoreVersion={restoreVersion} />
            </div>

        </div>
    )
}