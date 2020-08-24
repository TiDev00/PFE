import { element, by, ElementFinder } from 'protractor';

export class GroupComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-group div table .btn-danger'));
  title = element.all(by.css('jhi-group div h2#page-heading span')).first();
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

export class GroupUpdatePage {
  pageTitle = element(by.id('jhi-group-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  serviceNameInput = element(by.id('field_serviceName'));
  descServiceInput = element(by.id('field_descService'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setServiceNameInput(serviceName: string): Promise<void> {
    await this.serviceNameInput.sendKeys(serviceName);
  }

  async getServiceNameInput(): Promise<string> {
    return await this.serviceNameInput.getAttribute('value');
  }

  async setDescServiceInput(descService: string): Promise<void> {
    await this.descServiceInput.sendKeys(descService);
  }

  async getDescServiceInput(): Promise<string> {
    return await this.descServiceInput.getAttribute('value');
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

export class GroupDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-group-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-group'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
