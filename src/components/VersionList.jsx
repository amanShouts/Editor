/* eslint-disable react/prop-types */
import "../css/Versions.css"
import { BsDot } from 'react-icons/bs';
import { AiFillCaretRight, AiFillDelete } from 'react-icons/ai'
import { useState } from "react";

export function VersionList({ versionList, restoreVersion }) {

    // console.log(versionList, " inside versions --------------vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
    const [curElement, setCurElement] = useState({})


    function deleteDocument(element) {

    }

    return (
        <div className="versions_wrapper">
            <div className="versions_main">
                {
                    (versionList.length > 0) ? (


                        versionList.map((e) => {
                            return <li key={e.version} className="version_list_item" onMouseOver={() => { setCurElement(e) }}>
                                <span>
                                    {
                                        curElement.version == e.version ? <AiFillCaretRight /> : <BsDot />
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