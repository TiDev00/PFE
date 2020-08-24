import { element, by, ElementFinder } from 'protractor';

export class ServerComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-server div table .btn-danger'));
  title = element.all(by.css('jhi-server div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class ServerUpdatePage {
  pageTitle = element(by.id('jhi-server-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  serverNameInput = element(by.id('field_serverName'));
  ipServerInput = element(by.id('field_ipServer'));
  osServerInput = element(by.id('field_osServer'));
  loginInput = element(by.id('field_login'));
  passwordInput = element(by.id('field_password'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setServerNameInput(serverName: string): Promise<void> {
    await this.serverNameInput.sendKeys(serverName);
  }

  async getServerNameInput(): Promise<string> {
    return await this.serverNameInput.getAttribute('value');
  }

  async setIpServerInput(ipServer: string): Promise<void> {
    await this.ipServerInput.sendKeys(ipServer);
  }

  async getIpServerInput(): Promise<string> {
    return await this.ipServerInput.getAttribute('value');
  }

  async setOsServerInput(osServer: string): Promise<void> {
    await this.osServerInput.sendKeys(osServer);
  }

  async getOsServerInput(): Promise<string> {
    return await this.osServerInput.getAttribute('value');
  }

  async setLoginInput(login: string): Promise<void> {
    await this.loginInput.sendKeys(login);
  }

  async getLoginInput(): Promise<string> {
    return await this.loginInput.getAttribute('value');
  }

  async setPasswordInput(password: string): Promise<void> {
    await this.passwordInput.sendKeys(password);
  }

  async getPasswordInput(): Promise<string> {
    return await this.passwordInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ServerDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-server-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-server'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
