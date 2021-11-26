import {
  AchieveREInitiator,
  ACLMessage,
  ContractNetInitiator,
} from "../../../dist";

export class Task_CreateFile_RequestInitiator extends AchieveREInitiator {
  constructor(taskName: string, message: ACLMessage) {
    super(taskName, message);
    console.log("Task_CreateFile_RequestInitiator");
  }

  handleAgree(agree: ACLMessage): any {
    console.log("Task_CreateFile_RequestInitiator handleAgree");
    console.log(agree.getReplyWith());
    return "Agree";
  }

  handleRefuse(refuse: ACLMessage): any {
    console.log("Task_CreateFile_RequestInitiator handleRefuse");
    return "Refuse";
  }

  handleInform(inform: ACLMessage): any {
    console.log("Task_CreateFile_RequestInitiator handleInform");
    return "Inform";
  }
}

export class Task_CreateFolder_RequestInitiator extends AchieveREInitiator {
  constructor(taskName: string, message: ACLMessage) {
    super(taskName, message);
    console.log("Task_CreateFolder_RequestInitiator");
  }

  handleAgree(agree: ACLMessage): any {
    console.log("Task_CreateFolder_RequestInitiator handleAgree");
    return "Agree";
  }

  handleRefuse(refuse: ACLMessage): any {
    console.log("Task_CreateFolder_RequestInitiator handleRefuse");
    return "Refuse";
  }

  handleInform(inform: ACLMessage): any {
    console.log("Task_CreateFolder_RequestInitiator handleInform");
    return "Inform";
  }
}

export class Task_ModifyFile_RequestInitiator extends AchieveREInitiator {
  constructor(taskName: string, message: ACLMessage) {
    super(taskName, message);
    console.log("Task_ModifyFile_RequestInitiator");
  }

  handleAgree(agree: ACLMessage): any {
    console.log("Task_ModifyFile_RequestInitiator handleAgree");
    return "Agree";
  }

  handleRefuse(refuse: ACLMessage): any {
    console.log("Task_ModifyFile_RequestInitiator handleRefuse");
    return "Refuse";
  }

  handleInform(inform: ACLMessage): any {
    console.log("Task_ModifyFile_RequestInitiator handleInform");
    return "Inform";
  }
}

export class Task_ContractNetInitiator extends ContractNetInitiator {
  constructor(taskName: string, cfp: ACLMessage) {
    super(taskName, cfp);
    console.log("Task_RequestInitiator");
  }

  handlePropose(inform: ACLMessage): null {
    console.log("handlePropose");
    return null;
  }

  handleAcceptProposal(propose: ACLMessage): null {
    console.log("handleAcceptProposal");
    return null;
  }

  handleRefuse(refuse: ACLMessage): null {
    console.log("handleRefuse");
    return null;
  }

  handleInform(inform: ACLMessage): null {
    console.log("handleInform");
    return null;
  }
}
