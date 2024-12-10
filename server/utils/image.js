export function getFilePath(file){
   console.log("file",file);
    const filePath = file.path;
    const fileSplit = filePath.split('\\');
   
    return `${fileSplit[1]}/${fileSplit[2]}`;
}