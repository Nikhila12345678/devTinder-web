const Usercard = ({user}) => {
    const {firstName, lastName, photourl, skills, about} = user;
    return(
    <div className="card bg-base-200 w-80 shadow-sm rounded-3xl">
  <figure>
    <img
      src={user.photourl}
      alt="photo"
      className="h-70 w-full object-cover" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName}  {lastName}</h2>
    <p>{about}</p>
    {skills && <p>{skills}</p>}
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
)
}

export default Usercard;