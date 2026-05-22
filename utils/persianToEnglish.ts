export function persionToEnglish(str: string) {
    if (!str) {
        console.log('عددی به من داده نشده.')
    }

    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let result = str;
    for (let i = 0; i < 10; i++){
        result = result.replace(persianNumbers[i] , englishNumbers[i]);
    }

    return result;
}