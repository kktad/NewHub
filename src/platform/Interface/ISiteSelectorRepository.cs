using Sitecore.XA.Foundation.IoC;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;

namespace ComponentsLibrary.Interface
{
    public interface ISiteSelectorRepository : IModelRepository,
    IControllerRepository,
    IAbstractRepository<IRenderingModelBase>
    {
    }
}
