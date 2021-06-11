import React from "react";
import Part from "./Part"
import Total from "./Total"

const Content = ({content}) => {
    return(
      <>
        <ul>
        {content.map((part) =>
            <Part key={part.id} part={part}/>
        )}
        </ul>
        <Total content={content}/>
      </>
    )
  }

export default Content;
