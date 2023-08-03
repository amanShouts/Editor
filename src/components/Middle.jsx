import { useEffect, useState } from "react";
import "../css/Middle.css"

import { VersionList } from "./VersionList";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ResponsiveDialog from "./AlertDialog";

export function Middle() {
    const [text, setText] = useState("")
    const [pureText, setPureText] = useState("")
    const [date, setDate] = useState("")
    const [versions, setVersions] = useState(JSON.parse(localStorage.getItem("memorise_list")) || [])
    const [title, setTitle] = useState("")
    const [confirmation, setConfirmation] = useState(false)
    const [confirmationAnswer, setConfirmationAnswer] = useState(false)
    const [restoreObj, setRestoreObj] = useState({})


    useEffect(() => {
        if (confirmationAnswer) {
            setText(prev => restoreObj.content)
            setTitle(prev => restoreObj.title)
            setDate(prev => restoreObj.version)
            //clean up
            setConfirmationAnswer(prev => false)
            setRestoreObj(prev => { })
            setConfirmation(prev => false) // to open dialog box again
        }

    }, [confirmationAnswer])

    //update localstorage whenever document list changes
    useEffect(() => {
        saveToLocalStorage(versions)
    }, [versions])

    console.log(confirmationAnswer, " < to open dialog", confirmation, " <- to overwirte or not")
    function handleChange(content, delta, source, editor) {
        // content , delta, source, editor
        setPureText(editor.getText())
        setText(content)
    }

    function restoreVersion(element) {
        let restoreText = element.content
        let restoreDate = element.version
        // console.log(restoreText, " inside resotre version ", text)
        setRestoreObj(prev => element)
        //check if the two versions are same or diff
        if (restoreText != text || restoreDate != date) {
            // the two versions content are different, ask user 
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
            content: text,
            pureText: pureText
        }
        setDate(prev => currDate + " " + currTime)
        setVersions((prev) => {
            let newList = [...prev, versionObj]
            return newList
        })
    }

    function saveToLocalStorage(list) {
        localStorage.setItem("memorise_list", JSON.stringify(list))
    }

    function clearAll() {
        setDate("")
        setText("")
        setTitle("")
        setPureText("")
    }
    return (
        <div className="middle_wrapper">

            <ResponsiveDialog confirmation={confirmation} setConfirmationAnswer={setConfirmationAnswer} setConfirmation={setConfirmation} />
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
                <VersionList versionList={versions} restoreVersion={restoreVersion} setVersions={setVersions} openedObj={{ text, title, date }} clearAll={clearAll} />
            </div>

        </div>
    )
}