import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proficiencyFilter'
})
export class ProficiencyFilter implements PipeTransform {
  transform(items: any[], filter: Record<string, number>): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(proficiency => proficiency.proficiencyType === filter.proficiencyType);
  }
}
