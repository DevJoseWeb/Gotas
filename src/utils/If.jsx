export default props => {

    if (props.equal) {
        if (props.test === props.compare) {
            return props.children
        } else {
            return false
        }
    } else {
        if (props.test !== props.compare) {
            return props.children
        } else {
            return false
        }    
    }
}
