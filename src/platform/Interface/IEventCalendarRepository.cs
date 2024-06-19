using Sitecore.XA.Foundation.IoC;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;

namespace ComponentsLibrary.Interface
{
    public interface IEventCalendarRepository :
    IModelRepository,
    IControllerRepository,
    IAbstractRepository<IRenderingModelBase>
    {
    }
}
