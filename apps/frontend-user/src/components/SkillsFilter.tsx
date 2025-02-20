import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface SkillsFilterProps {
  allSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export function SkillsFilter({ allSkills, onSkillsChange }: SkillsFilterProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
    onSkillsChange(newSkills);
  };

  return (
    <section className="mb-6">
      <h3 className="text-2xl font-bold mb-4 text-center">Filter by Skills</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {allSkills.map((skill) => (
          <Badge
            key={skill}
            variant={selectedSkills.includes(skill) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleSkill(skill)}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </section>
  )
}

