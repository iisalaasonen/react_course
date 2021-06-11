import React from "react";
import Header from "./Header"
import Content from "./Content"

const Course = ({course}) => {

        return (
            <div>
                <Header name={course.name}/>
                <Content content={course.parts}/>
            </div>
        );
    }

export default Course;

/*
const Course = ({courses}) => {

    return (
        <div>
            {courses.map((course) => {
            return(
                <>
                <Header key={course.id} name={course.name}/>
                <Content key={course.id} content={course.parts}/>
                </>
            )
            }
            )}
        </div>
    );
}
*/