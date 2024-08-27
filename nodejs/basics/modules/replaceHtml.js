module.exports = replaceHtml = (template, userData) => {
    let output = template.replace(/{{%ID%}}/g, userData.id);
    output = output.replace("{{%TITLE%}}", userData.title);
    output = output.replace("{{%BODY%}}", userData.body);


    return output

}