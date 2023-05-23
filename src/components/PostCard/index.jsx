export const PostCard = ({title, cover, body, id, post}) =>(
//export const PostCard = ({post}) =>{ é o mesmo que:
/*export const PostCard = ({props}) =>{
    const {post} = props ou
    const post = props.post
    */
<div className="post" >
<img src={cover} alt={title} />
<div className="post-content">
  <h2>{title}</h2>
  <p>{body}</p>
</div>
</div>)
