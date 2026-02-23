import StarBorder from './StarBorder'

function ProjectCard({ project }) {
    return (
        <StarBorder
            as="button"
            className="project-info"
            color="cyan"
            speed="5s"
        >
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">
                {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                ))}
            </div>
            <div className="project-links">
                <a href="#" className="project-link">visit site →</a>
                <a href="#" className="project-link">view code →</a>
            </div>
        </StarBorder>
    )
}

export default ProjectCard;