import React from 'react';


interface TextareaProps {
    title : string;
    id : string;
}

//       <label htmlFor={`${title.toLowerCase()}-textarea`} className="form-label">{title}</label>
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({title, id} : TextareaProps, ref) => (
  <textarea ref={ref} className="form-control" id={id} rows={4}></textarea>
));

export default Textarea;
