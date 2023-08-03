/* eslint-disable react/prop-types */
import "../css/Versions.css"
import { BsDot } from 'react-icons/bs';
import { AiFillCaretRight, AiFillDelete } from 'react-icons/ai'
import { useState } from "react";

export function VersionList({ versionList, restoreVersion, setVersions }) {

    const [curElement, setCurElement] = useState({})


    function deleteDocument(element) {
        let newList = versionList.filter((ele) => {
            if (ele.version === element.version && ele.title === element.title)
                return false;
            return true;
        })
        console.log(newList)
        setVersions(prev => [...newList])

    }
    console.log(curElement, versionList, " real list")
    return (
        <div className="versions_wrapper">
            <div className="versions_main">
                {
                    (versionList.length > 0) ? (


                        versionList.map((e) => {
                            return <li key={e.version} className="version_list_item" onMouseOver={() => { setCurElement(e) }}>
                                <span>
                                    {
                                        curElement.version == e.version ? <AiFillCaretRight style={{
                                            boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                                            fontSize: "1.2em",
                                            color: "white",
                                        }} /> : <BsDot />
                                    }
                                </span>

                                <span onClick={() => { restoreVersion(e) }} > <u> {e.title == "" ? e.content.slice(0, 10).trim() : e.title} </u> </span>
                                <span> {e.version}</span>
                                <button onClick={() => { deleteDocument(e) }}><AiFillDelete /></button>
                            </li>

                        })

                    )
                        : (<p> <b> No versions Saved yet. Click Save </b></p>)

                }
            </div>
        </div>
    )
}