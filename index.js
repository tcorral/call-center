//import CallCenter from './src/call-center';
//import Call from './src/call';
//import DecisionTree from './src/decision-tree';
//import Department from './src/department';
//import Question from './src/question';
//import Employee from './src/employee';

var CallCenter  = require('./src/call-center');
var Call  = require('./src/call');
var Department  = require('./src/department');
var Question  = require('./src/question');
var Employee  = require('./src/employee');

var callCenter = new CallCenter();

var financeDepartment = new Department('Finance', 1);
var supportDepartment = new Department('Support', 2);

callCenter.addDepartment(financeDepartment);
callCenter.addDepartment(supportDepartment);

var globalDecisionTree = callCenter.getGlobalDepartment().decisionTree;
var financeDecisionTree = financeDepartment.decisionTree;
var supportDecisionTree = supportDepartment.decisionTree;

var questionGlobal1 = new Question({
  name: 'f0',
  statement: 'Finance?',
  redirectOn: 'true',
  redirectTo: 1
});

var questionGlobal2 = new Question({
  name: 's0',
  statement: 'Support?',
  redirectOn: 'true',
  redirectTo: 2
});
globalDecisionTree.addQuestion(questionGlobal1);
globalDecisionTree.addQuestion(questionGlobal2);

var questionFinance1 = new Question({
  name: 'fq1',
  statement: 'Finance question 1',
  scaleOn: 'true'
});

var questionFinance2 = new Question({
  name: 'fq2',
  statement: 'Finance question 2',
  scaleOn: 'false',
  redirectOn: 'true',
  redirectTo: 2
});

financeDecisionTree.addQuestion(questionFinance1);
financeDecisionTree.addQuestion(questionFinance2);

var questionSupport1 = new Question({
  name: 'sq1',
  statement: 'Support question 1',
  scaleOn: 'false',
  redirectOn: 'true',
  redirectTo: 1
});

supportDecisionTree.addQuestion(questionSupport1);

var gateway = new Employee('Gateway', 'Gateway');
var directorFinance = new Employee('Malou', 'Casidi');
var managerFinance = new Employee('Simbad', 'Sailor', directorFinance);
var agentFinance1 = new Employee('Tomas', 'Corral', managerFinance);
var agentFinance2 = new Employee('Guy', 'Rombaut', managerFinance);

var directorSupport = new Employee('Sidney', 'Hoover');
var managerSupport = new Employee('Roger', 'Krump', directorSupport);
var agentSupport1 = new Employee('Marian', 'Zafra', managerSupport);
var agentSupport2 = new Employee('Ricky', 'Martos', managerSupport);

callCenter.getGlobalDepartment().registerEmployee(gateway);
financeDepartment.registerEmployee(directorFinance);
financeDepartment.registerEmployee(managerFinance);
financeDepartment.registerEmployee(agentFinance1);
financeDepartment.registerEmployee(agentFinance2);

supportDepartment.registerEmployee(directorSupport);
supportDepartment.registerEmployee(managerSupport);
supportDepartment.registerEmployee(agentSupport1);
supportDepartment.registerEmployee(agentSupport2);

callCenter.getGlobalDepartment().employees[0].startWorkingDay();
directorFinance.startWorkingDay();
managerFinance.startWorkingDay();
agentFinance1.startWorkingDay();

directorSupport.startWorkingDay();
managerSupport.startWorkingDay();
agentSupport1.startWorkingDay();
agentSupport2.startWorkingDay();

//document.getElementById('addCall').addEventListener('click', function () {

var call = new Call(Math.random() * 999999999);
//var call2 = new Call(Math.random() * 999999999);
//var call3 = new Call(Math.random() * 999999999);
//var call4 = new Call(Math.random() * 999999999);
//var call5 = new Call(Math.random() * 999999999);
//var call6 = new Call(Math.random() * 999999999);
callCenter.addCall(call);

//callCenter.addCall(call2);
//callCenter.addCall(call3);
//callCenter.addCall(call4);
//callCenter.addCall(call5);
//callCenter.addCall(call6);
//});
