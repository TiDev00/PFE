import { element, by, ElementFinder } from 'protractor';

export class ProcessComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-process div table .btn-danger'));
  title = element.all(by.css('jhi-process div h2#page-heading span')).first();
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

export class ProcessUpdatePage {
  pageTitle = element(by.id('jhi-process-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  processNameInput = element(by.id('field_processName'));
  descProcessInput = element(by.id('field_descProcess'));

  applicationSelect = element(by.id('field_application'));
  serverSelect = element(by.id('field_server'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setProcessNameInput(processName: string): Promise<void> {
    await this.processNameInput.sendKeys(processName);
  }

  async getProcessNameInput(): Promise<string> {
    return await this.processNameInput.getAttribute('value');
  }

  async setDescProcessInput(descProcess: string): Promise<void> {
    await this.descProcessInput.sendKeys(descProcess);
  }

  async getDescProcessInput(): Promise<string> {
    return await this.descProcessInput.getAttribute('value');
  }

  async applicationSelectLastOption(): Promise<void> {
    await this.applicationSelect.all(by.tagName('option')).last().click();
  }

  async applicationSelectOption(option: string): Promise<void> {
    await this.applicationSelect.sendKeys(option);
  }

  getApplicationSelect(): ElementFinder {
    return this.applicationSelect;
  }

  async getApplicationSelectedOption(): Promise<string> {
    return await this.applicationSelect.element(by.css('option:checked')).getText();
  }

  async serverSelectLastOption(): Promise<void> {
    await this.serverSelect.all(by.tagName('option')).last().click();
  }

  async serverSelectOption(option: string): Promise<void> {
    await this.serverSelect.sendKeys(option);
  }

  getServerSelect(): ElementFinder {
    return this.serverSelect;
  }

  async getServerSelectedOption(): Promise<string> {
    return await this.serverSelect.element(by.css('option:checked')).getText();
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

export class ProcessDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-process-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-process'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
