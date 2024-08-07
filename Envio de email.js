function myFunction() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Respostas"); //Colocar o nome da planilha
  var emailColumn = 6; // Coluna da célula do email
  var checkColumn = 7; // Coluna da Checkbox
  var nomeColumn = 2; // Coluna do nome
  var numRows = sheets.getLastRow(); // Corresponde ao número de linhas da planilha
  var emailssent = []; // É para enviar o email automático do acesso dos usuários novos (NÃO APAGAR)

  for (var i = 2; i <= numRows; i++) {
    var email = sheets.getRange(i, emailColumn).getDisplayValue();
    var nome = sheets.getRange(i, nomeColumn).getDisplayValue();
    var isChecked = sheets.getRange(i, checkColumn).getValue(); 

  
    if (isChecked === "ENVIADO") {
      console.log("E-mail já enviado para:", email);
      emailssent.push(email + " - " + nome);
      continue;
    }

    var content = {
      name: "NIIT - FASEPA",
      to: email,
      subject: "Assunto - Acesso ao Sistema",
      htmlBody: "Olá " + nome + ", Seja bem vindo ao sistema."
    };

    try {
      MailApp.sendEmail(content);
      sheets.getRange(i, checkColumn).setValue("ENVIADO"); 
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
    }
  }
  if (emailssent.length > 0) {
    var mensagemEmpresa = "E-mails já enviados:\n\n";
    mensagemEmpresa += emailssent.join("\n");
    
    var emailEmpresa = "amandremoraes@gmail.com"; 
    var assuntoEmpresa = "Resumo de E-mails já enviados";
    
    try {
      MailApp.sendEmail(emailEmpresa, assuntoEmpresa, mensagemEmpresa);
    } catch (error) {
      console.error("Erro ao enviar e-mail para a empresa:", error);
    }
  }

}
