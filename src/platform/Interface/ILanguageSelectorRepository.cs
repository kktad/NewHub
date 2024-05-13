using ComponentsLibrary.Model;
using Sitecore.XA.Foundation.IoC;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;
using System.Collections.Generic;
using Sitecore.Data.Items;

namespace ComponentsLibrary.Interface
{
    public interface ILanguageSelectorRepository : IModelRepository,
    IControllerRepository,
    IAbstractRepository<IRenderingModelBase>
    {
        IList<LanguageSelectorItem> GetLanguageSelectorItems();

        IList<LanguageSelectorItem> GetLanguageSelectorItems(Item item);

        LanguageSelectorItem GetActiveLanguageItem(
          IEnumerable<LanguageSelectorItem> languageSelectorItems);
    }
}
