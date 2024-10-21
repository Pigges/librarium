import DOMPurify from "isomorphic-dompurify";
import {marked} from 'marked';

// Make sure that the Markdown is sanitized
export default (md)=>{
    return DOMPurify.sanitize(marked.parse(md || ""));
}