/**
 * File Description: Font examples
 * File version: 1.0
 * Contributors: Josh
 */

import React from "react";

const FontExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Font styles:</div>
            <div className="title-text">title-text</div>
            <div className="main-text">main-text</div>
            <div className="large-text">large-text</div>
            <div className="medium-text">medium-text</div>
            <div className="small-text">small-text</div>
            <div className="large-number-text">large-number-text</div>
            <div className="logo-text">logo-text</div>
            <div className="message-tag-text">message-tag-text</div>
            <div className="message-receiver-name-text">
                message-receiver-name-text
            </div>
            <div className="message-read-text">message-read-text</div>
            <div className="message-unread-text">message-unread-text</div>
            <div className="message-name-read-text">message-name-read-text</div>
            <div className="message-name-unread-text">message-name-unread-text</div>
        </div>
    )
}

export default FontExamples;