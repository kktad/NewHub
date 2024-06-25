using Sitecore.XA.Foundation.IoC;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;

namespace ComponentsLibrary.Interface
{
    public interface ITagListRepository :
    IModelRepository,
    IControllerRepository,
    IAbstractRepository<IRenderingModelBase>
    {
    }
}
