export class UtilFunctions {

    public static getRamdomIdsToFinds(totalRecords: number, count: number): string {
        let array = [];
        for (let i = 0; i < count; i++) {
          let num = Math.floor((Math.random() * totalRecords) + 1); 
          if (array.length === 0) {
            array.push(num);
          } else {
            let isRepeated = this.isNumberRepeated(array, num);
            if (isRepeated) {
              do {
                num = Math.floor((Math.random() * totalRecords) + 1); 
                isRepeated = this.isNumberRepeated(array, num);
              } while (isRepeated)
            }
    
            array.push(num);
          }
    
        }
        return array.join();
      }
    
      private static isNumberRepeated(array: number[], num: number): boolean {
        let isRepeated = false;
        if (array.indexOf(num) === 0) { 
           isRepeated = true;
        }
        return isRepeated;
      }

}