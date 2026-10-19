import { skills } from '@content/skills'
import Section from '../layout/Section'
import Tags from '../ui/Tags'

export default function Skills(props) {
  return (
    <Section {...props} title={<>Skills &amp; <em>toolkit</em></>}>
      <dl className="skills">
        {Object.entries(skills).map(([group, items]) => (
          <div className="skills__row" key={group}>
            <dt>{group}</dt>
            <dd><Tags items={items} /></dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
